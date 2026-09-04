export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated server-side from typed content, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
