import React from "react";

export default function CardDemo() {
  return (
    <div className="w-full max-w-xs rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-lg leading-tight font-semibold tracking-tight text-card-foreground">
          Card Title
        </h3>
        <p className="text-sm text-muted-foreground">A description of this component demo card.</p>
      </div>
      <div className="mt-4 text-sm text-foreground/90">
        This is a simple card preview built with standard CSS classes and shadcn styles.
      </div>
    </div>
  );
}
