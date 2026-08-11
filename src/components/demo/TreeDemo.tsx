'use client';

import { Tree, TreeItem, TreeItemLabel } from '@/components/ui/tree';
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Item {
  name: string;
  children?: string[];
}


const items: Record<string, Item> = {
  crm: {
    name: 'CRM',
    children: ['leads', 'accounts', 'activities', 'support', 'marketing', 'sales', 'analytics'],
  },
  leads: {
    name: 'Leads',
    children: ['new-lead', 'contacted-lead', 'qualified-lead'],
  },
  'new-lead': { name: 'New Lead' },
  'contacted-lead': { name: 'Contacted Lead' },
  'qualified-lead': { name: 'Qualified Lead' },
  accounts: {
    name: 'Accounts',
    children: ['acme-corp', 'globex-inc'],
  },
  'acme-corp': {
    name: 'Acme Corp',
    children: ['acme-contacts', 'acme-opportunities'],
  },
  'acme-contacts': {
    name: 'Contacts',
    children: ['john-smith', 'jane-doe'],
  },
  'john-smith': { name: 'John Smith' },
  'jane-doe': { name: 'Jane Doe' },
  'acme-opportunities': {
    name: 'Opportunities',
    children: ['website-redesign', 'annual-maintenance'],
  },
  'website-redesign': { name: 'Website Redesign' },
  'annual-maintenance': { name: 'Annual Maintenance' },
  'globex-inc': {
    name: 'Globex Inc',
    children: ['globex-contacts', 'globex-opportunities'],
  },
  'globex-contacts': {
    name: 'Contacts',
    children: ['alice-johnson'],
  },
  'alice-johnson': { name: 'Alice Johnson' },
  'globex-opportunities': {
    name: 'Opportunities',
    children: ['cloud-migration'],
  },
  'cloud-migration': { name: 'Cloud Migration' },
  activities: {
    name: 'Activities',
    children: ['calls', 'meetings', 'emails'],
  },
  calls: { name: 'Calls' },
  meetings: { name: 'Meetings' },
  emails: { name: 'Emails' },
  support: {
    name: 'Support',
    children: ['open-tickets', 'closed-tickets'],
  },
  'open-tickets': { name: 'Open Tickets' },
  'closed-tickets': { name: 'Closed Tickets' },
  marketing: {
    name: 'Marketing',
    children: ['campaigns', 'social-media', 'content'],
  },
  campaigns: { name: 'Campaigns' },
  'social-media': { name: 'Social Media' },
  content: { name: 'Content' },
  sales: {
    name: 'Sales',
    children: ['pipeline', 'forecast', 'reports'],
  },
  pipeline: { name: 'Pipeline' },
  forecast: { name: 'Forecast' },
  reports: { name: 'Reports' },
  analytics: {
    name: 'Analytics',
    children: ['dashboard', 'metrics', 'events'],
  },
  dashboard: { name: 'Dashboard' },
  metrics: { name: 'Metrics' },
  events: { name: 'Events' },
};

const indent = 20;

export default function TreeDemo() {
  const tree = useTree<Item>({
    initialState: {
      expandedItems: ['leads', 'accounts', 'activities', 'support', 'marketing', 'sales', 'analytics'],
    },
    indent,
    rootItemId: 'crm',
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  });

  return (
    <div className="flex flex-col gap-5 w-full justify-start items-start">
        <div className="self-start w-full">
        <Tree
            className="relative overflow-hidden before:absolute before:inset-0 before:-ms-1.25 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
            indent={indent}
            tree={tree}
            toggleIconType="plus-minus"
        >
          <AnimatePresence initial={false}>
            {tree.getItems().map((item) => {
            return (
              <motion.div
                key={item.getId()}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <TreeItem item={item} className="w-full text-left">
                    <TreeItemLabel className="w-full before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
                        <span className="flex items-center gap-2 ms-1">
                        {item.isFolder() ? (
                            item.isExpanded() ? (
                            <FolderOpenIcon className="text-muted-foreground pointer-events-none size-4" />
                            ) : (
                            <FolderIcon className="text-muted-foreground pointer-events-none size-4" />
                            )
                        ) : (
                            <FileIcon className="text-muted-foreground pointer-events-none size-4" />
                        )}
                        {item.getItemName()}
                        </span>
                    </TreeItemLabel>
                </TreeItem>
              </motion.div>
            );
            })}
          </AnimatePresence>
        </Tree>
        </div>
    </div>
  );
}
