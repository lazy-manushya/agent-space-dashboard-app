import {
  Tabs as RACTabs,
  TabList as RACTabList,
  TabListProps,
  TabProps,
  Tab as RACTab,
  TabsProps,
  TabPanels as RACTabPanels,
  TabPanelProps,
  TabPanel as RACTabPanel,
  composeRenderProps,
  SelectionIndicator,
  TabPanelsProps,
} from "react-aria-components";

import styles from "./Tabs.module.css";

export function Tabs(props: TabsProps) {
  return <RACTabs {...props} className={styles.Tabs} />;
}

export function TabList<T extends object>(props: TabListProps<T>) {
  return <RACTabList {...props} className={styles.TabList} />;
}

export function Tab(props: TabProps) {
  return (
    <RACTab {...props} className={styles.Tab}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <SelectionIndicator className={styles.SelectionIndicator} />
        </>
      ))}
    </RACTab>
  );
}

export function TabPanels<T extends object>(props: TabPanelsProps<T>) {
  return <RACTabPanels {...props} className={styles.TabPanels} />;
}

export function TabPanel(props: TabPanelProps) {
  return <RACTabPanel {...props} className={styles.TabPanel} />;
}
