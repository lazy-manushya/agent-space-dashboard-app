import { ReactNode, ReactElement, useCallback, useMemo, useState } from "react";
import { useClipboard } from "react-aria";

import Button from "@/components/Button";
// import QrCode from "@/components/QrCode";
import useToggle from "@/hooks/useToggle";
import Drawer, { IDrawerProps } from "@/components/Drawer";
import Image from "@/components/Image";
import { joinClassNames } from "@/utils/classNames";

import { ShareContent } from "../Share.types";
import Share from "../Share";
import styles from "./useShare.module.css";

const Option = ({
  label,
  icon,
  link,
  onClick,
  color,
}: {
  icon: string;
  label: string;
  link?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  color?: string;
}) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={styles.option}
    linkProps={
      link
        ? { target: "_blank", rel: "noopener noreferrer", href: link }
        : undefined
    }
  >
    <div className={styles.iconContainer} style={{ background: color }}>
      <Image className={styles.icon} alt="" src={icon} width={32} height={32} />
    </div>
    <div className={styles.label} style={{ color }}>
      {label}
    </div>
  </Button>
);

function useShare({
  content,
  // qrText,
  // qrCodeRenderer,
  drawerProps = {},
}: {
  content: ShareContent;
  qrText?: string;
  qrCodeRenderer?: (data: {
    qrCodeJsx: ReactElement;
    qrCodeLabelJsx: ReactElement;
  }) => ReactNode;
  drawerProps?: Pick<IDrawerProps, "title">;
}) {
  const { url = "", isUrlRelative } = content;

  const { state: isShareDrawerOpen, setState: setShareDrawerOpenState } =
    useToggle({
      onChange: (value) => {
        if (!value) {
          setCopied(false);
        }
      },
    });

  const [copied, setCopied] = useState(false);
  const { clipboardProps } = useClipboard({
    onCopy: () => {
      setCopied(true);
    },
  });

  const handleCopyUrl = useCallback(() => {
    let shareUrl = url;

    if (isUrlRelative) {
      shareUrl = Share.getShareUrl(url);
    }

    Share.copyToClipboard(shareUrl);
    setCopied(true);
  }, [url, isUrlRelative]);

  const shareContent = useMemo(() => Share.getShareContent(content), [content]);

  // const qrCodeJsx = <QrCode url={shareContent.default.url} text={qrText} />;
  // const qrCodeLabel = <div className={styles.qrLabel}>QR code</div>;
  // const qrCodeFinalJsx = (
  //   <>
  //     {qrCodeRenderer ? (
  //       qrCodeRenderer({ qrCodeJsx: qrCodeJsx, qrCodeLabelJsx: qrCodeLabel })
  //     ) : (
  //       <div className={styles.qrContainer}>
  //         {qrCodeLabel}
  //         {qrCodeJsx}
  //       </div>
  //     )}
  //   </>
  // );
  // const qrModalJsx = (
  //   <Modal showCloseButton state={qrModalState} width="480px">
  //     {qrCodeFinalJsx}
  //   </Modal>
  // );

  const shareModalJsx = (
    <Drawer
      isOpen={isShareDrawerOpen}
      onOpenChange={setShareDrawerOpenState}
      {...drawerProps}
    >
      <div className={styles.container}>
        <div className={`${styles.optionsContainer} mt-4`}>
          {/* {isScreenSmallerThanTablet && (
            <Button openInNewTab variant="ghost" className={styles.option}>
              {qrCodeFinalJsx}
            </Button>
          )} */}

          <Option
            label="Whatsapp"
            link={shareContent.whatsapp.url}
            data-action="share/whatsapp/share"
            icon="/assets/images/icons/whatsapp.svg"
            color="#25D366"
          />

          <Option
            label="Facebook"
            link={shareContent.default.url}
            data-action="share/facebook/share"
            icon="/assets/images/icons/fb.svg"
            color="#1877F2"
          />

          <Option
            label="X (Twitter)"
            link={shareContent.default.url}
            data-action="share/twitter/share"
            icon="/assets/images/icons/twitter_x.svg"
            color="#000"
          />

          {false && (
            <Option
              icon="share/message.svg"
              label="SMS"
              link="sms:?body=Checkout%20this%20awesome%20website%20%40%20http%253A%252F%252Fgilgreenberg.com%252F"
            />
          )}

          <Option
            icon="/assets/images/icons/telegram.svg"
            label="Telegram"
            link={shareContent.telegram.url}
            color="#0088CC"
          />

          {/* {!isScreenSmallerThanTablet && (
            <Option
              icon="share/qr.svg"
              label="QR code"
              onClick={qrModalState.open}
            />
          )} */}

          {false && (
            <Option
              icon="share/linkedin.svg"
              label="Linkedin"
              link={
                "https://www.linkedin.com/shareArticle?mini=true&url={mysiteurlvariable}?v={myidvariable}&title=ThisTitle"
              }
            />
          )}

          {Share.isShareSupported() && (
            <Option
              icon="/assets/images/icons/share.svg"
              label="More"
              onClick={() => {
                Share.share(content);
              }}
              color="rgba(var(--clr-primary-rgb))"
            />
          )}
        </div>
        {!!url && (
          <>
            <div
              className={joinClassNames(styles.shareLink, "mt-4")}
              role="textbox"
              tabIndex={0}
              {...clipboardProps}
              onClick={handleCopyUrl}
            >
              <div className={styles.content}>{shareContent.default.url}</div>
              {copied ? (
                <Image
                  className="filter-clr-primary"
                  src="/assets/images/icons/tick.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src="/assets/images/icons/copy.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Drawer>
  );

  const modalJsx = (
    <>
      {shareModalJsx}
      {/* {qrModalJsx} */}
    </>
  );

  const share = useCallback(() => {
    setShareDrawerOpenState(true);
  }, [setShareDrawerOpenState]);

  return {
    modalJsx,
    share,
  };
}

export default useShare;
