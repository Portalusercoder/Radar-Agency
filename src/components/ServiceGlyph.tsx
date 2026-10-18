import type { ServiceIcon } from "../data";

const paths: Record<ServiceIcon, string> = {
  ads: "M4 14h4l7-6v12l-7-6H4zm12.2-2.2 2.3-1.3M16.2 16.2l2.3 1.3M17 12v4",
  social: "M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM16 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.2 12.2C5.3 13 4 14.6 4 16.5V18h8v-1.5c0-1.9-1.3-3.5-3.2-4.3ZM14.4 11.4c1.5.6 2.6 1.9 2.6 3.5V18h3v-2.6c0-1.5-1-2.8-2.5-3.4",
  design: "M5 16.5 14.5 7a2.1 2.1 0 0 1 3 3L8 19.5H5v-3ZM13 8.5l2.5 2.5",
  store: "M5 8h14l-1.2 11H6.2L5 8Zm2-3h10l1 3H6l1-3Z",
  seo: "M11 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm3.5-1.5 4 4",
  geo: "M12 4.5 13.8 9l4.7.4-3.6 3.1 1.2 4.5L12 14.8 7.9 17l1.2-4.5L5.5 9.4 10.2 9 12 4.5Z",
  maps: "M12 20s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  consult: "M12 4.8 19 8v8l-7 3.2L5 16V8l7-3.2ZM12 12V20M12 12 5.4 8.6M12 12l6.6-3.4",
  influencer: "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6.5 19c.6-2.6 2.8-4.2 5.5-4.2S16.9 16.4 17.5 19M16 6.2l.7-1.6M18.4 8.2l1.5-.8M8 6.2 7.3 4.6M5.6 8.2l-1.5-.8",
};

export function ServiceGlyph({ name }: { name: ServiceIcon }) {
  return (
    <span className="glyph" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d={paths[name]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}
