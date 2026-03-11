import React from "react";

type JsonLdValue = Record<string, any> | Array<Record<string, any>>;

export default function StructuredData({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}