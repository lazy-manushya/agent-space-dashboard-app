import { NextResponse } from 'next/server';
import type { IBoeHeader } from '@/types/data';
import { getMasterDataset, getFixedSeed } from '@/api/boe-headers/boeHeadersData.service';
import { generateRandomData } from '@/utils/dataGenerator';

function hashStringToInt(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Build a simple suggestion item shape
 */
// Build suggestion objects inline to preserve strong typing per category

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? Math.max(1, parseInt(limitParam, 10) || 5) : 5;

    // If no query, return empty arrays
    if (!q) {
      return NextResponse.json({
        boe_header: [],
        invoices: [],
        duties: [],
        licences: [],
        summaries: [],
      });
    }

    const queryLower = q.toLowerCase();
    const headers = getMasterDataset();
    const baseSeed = getFixedSeed();

    const boe_header: Array<{ id: string; name: string }> = [];
    const invoices: Array<{ id: string | number; name: string }> = [];
    const duties: Array<{ id: string | number; name: string }> = [];
    const licences: Array<{ id: string | number; name: string }> = [];
    const summaries: Array<{ id: string | number; name: string }> = [];

    // First, collect header suggestions (fast, in-memory)
    for (let i = 0; i < headers.length && boe_header.length < limit; i++) {
      const h = headers[i] as IBoeHeader;
      if (
        h.be_no.toLowerCase().includes(queryLower) ||
        h.iec_no.toLowerCase().includes(queryLower) ||
        h.gst_no.toLowerCase().includes(queryLower) ||
        h.port_code.toLowerCase().includes(queryLower) ||
        h.year.toLowerCase().includes(queryLower)
      ) {
        boe_header.push({ id: h.be_no, name: `${h.be_no} — ${h.port_code} (${h.year})` });
      }
    }

    // For related entities (invoices, duties, licences, summaries) we'll iterate headers
    // and generate related records on-demand until we fill suggestion arrays up to `limit` each.
    for (let i = 0; i < headers.length && (invoices.length < limit || duties.length < limit || licences.length < limit || summaries.length < limit); i++) {
      const h = headers[i] as IBoeHeader;
      const seedForBe = baseSeed + hashStringToInt(h.be_no);

      // Generate invoices for this BE (use up to no_of_invoices or 5)
      if (invoices.length < limit) {
        try {
          const invCount = Math.min(Math.max(1, h.no_of_invoices || 1), 10);
          const invs = generateRandomData(invCount, 'invoice', seedForBe, h.be_no) as any[];
          for (let inv of invs) {
            if (invoices.length >= limit) break;
            const searchable = `${inv.invoice_no || ''} ${inv.supplier || ''}`.toLowerCase();
            if (searchable.includes(queryLower)) {
              invoices.push({ id: inv.invoice_item_id || inv.invoice_no || `${h.be_no}-${inv.invoice_sno}`, name: `${inv.invoice_no || 'INV'} — ${inv.supplier || ''}` });
            }
          }
        } catch (e) {
          // ignore generation errors
        }
      }

      // Duties
      if (duties.length < limit) {
        try {
          const d = generateRandomData(1, 'duty', seedForBe + 1, h.be_no)[0] as any;
          const searchable = `${d.bcd_notn_no || ''} ${d.igst_notn_no || ''}`.toLowerCase();
          if (searchable.includes(queryLower)) {
            duties.push({ id: d.duty_id, name: `${d.bcd_notn_no || d.igst_notn_no || d.duty_id}` });
          }
        } catch (e) {
          // ignore
        }
      }

      // Licences
      if (licences.length < limit) {
        try {
          const lic = generateRandomData(1, 'licence', seedForBe + 2, h.be_no)[0] as any;
          if (lic && lic.licence_items) {
            for (let li of lic.licence_items) {
              if (licences.length >= limit) break;
              const searchable = `${li.licence_number || ''} ${li.licence_code || ''}`.toLowerCase();
              if (searchable.includes(queryLower)) {
                licences.push({ id: li.licence_item_sl_no || li.licence_number, name: `${li.licence_number} — ${li.licence_code || ''}` });
              }
            }
          }
        } catch (e) {
          // ignore
        }
      }

      // Summaries (billOfSummary)
      if (summaries.length < limit) {
        try {
          const s = generateRandomData(1, 'billOfSummary', seedForBe + 3, h.be_no)[0] as any;
          const searchable = `${s.importer_name || ''} ${s.mawb_no || ''} ${s.igm_no || ''}`.toLowerCase();
          if (searchable.includes(queryLower)) {
            summaries.push({ id: s.summary_id, name: `${s.importer_name || s.mawb_no || s.igm_no}` });
          }
        } catch (e) {
          // ignore
        }
      }
    }

    return NextResponse.json({
      boe_header,
      invoices,
      duties,
      licences,
      summaries,
    });
  } catch (error) {
    console.error('Suggestions API error:', error);
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
