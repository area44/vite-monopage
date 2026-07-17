import React from "react";

import type { CalloutType } from "@/components/ui/callout";

import { Callout } from "@/components/ui/callout";

export function extractAlertMarker(
  children: React.ReactNode,
): { type: CalloutType; cleanedChildren: React.ReactNode } | null {
  if (!children) return null;

  let alertType: CalloutType | "none" | null = null;

  function traverse(node: React.ReactNode): React.ReactNode {
    if (alertType && alertType !== "none") return node;

    if (typeof node === "string") {
      const trimmed = node.trimStart();
      const match = trimmed.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\](?:\s*\n)?/i);
      if (match) {
        let matchedType = match[1].toLowerCase();
        if (matchedType === "info") matchedType = "note";
        alertType = matchedType as CalloutType;
        const markerIndex = node.indexOf(match[0].trim());
        const sliceIndex = markerIndex + match[0].length;
        return node.slice(sliceIndex);
      }
      if (trimmed.length > 0) {
        alertType = "none";
      }
      return node;
    }

    if (React.isValidElement(node)) {
      const elementChildren = node.props.children;
      if (elementChildren !== undefined) {
        if (Array.isArray(elementChildren)) {
          const newChildren = [...elementChildren];
          for (let i = 0; i < newChildren.length; i++) {
            const cleaned = traverse(newChildren[i]);
            if (alertType) {
              if (alertType === "none") return node;
              newChildren[i] = cleaned;
              return React.cloneElement(node, {
                ...node.props,
                children: newChildren,
              } as any);
            }
          }
        } else {
          const cleaned = traverse(elementChildren);
          if (alertType) {
            if (alertType === "none") return node;
            return React.cloneElement(node, {
              ...node.props,
              children: cleaned,
            } as any);
          }
        }
      }
    }

    return node;
  }

  if (Array.isArray(children)) {
    const newChildren = [...children];
    for (let i = 0; i < newChildren.length; i++) {
      const cleaned = traverse(newChildren[i]);
      if (alertType) {
        if (alertType === "none") return null;
        newChildren[i] = cleaned;
        return {
          type: alertType,
          cleanedChildren: newChildren,
        };
      }
    }
    return null;
  }

  const cleanedChildren = traverse(children);
  if (alertType && alertType !== "none") {
    return { type: alertType, cleanedChildren };
  }
  return null;
}

export function AlertBlock({ children, type }: { children: React.ReactNode; type: CalloutType }) {
  const titles: Record<CalloutType, string> = {
    default: "Info",
    note: "Note",
    tip: "Tip",
    important: "Important",
    warning: "Warning",
    caution: "Caution",
    error: "Error",
    success: "Success",
  };

  const title = titles[type] || "Note";

  return (
    <Callout type={type} title={title}>
      {children}
    </Callout>
  );
}
