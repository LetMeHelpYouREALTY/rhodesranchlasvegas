import { SiteImage } from "@/components/media/SiteImage";
import {
  googleBusinessProfileReviewHref,
  googleMapsProfileHref,
  googleSearchShareHref,
  siteContact,
} from "@/lib/site-contact";

type NapBlockProps = {
  /** Use h2 on dedicated “locations” or hub pages that demote other sections to h3. @default 3 */
  titleLevel?: 2 | 3;
  /** Must match `aria-labelledby` and heading `id` (unique if multiple blocks on one view). */
  headingId?: string;
};

export function NapBlock({ titleLevel = 3, headingId = "nap-heading" }: NapBlockProps) {
  const TitleTag = titleLevel === 2 ? "h2" : "h3";
  return (
    <section
      aria-labelledby={headingId}
      className="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0_/0.06)] ring-1 ring-stone-900/5"
    >
      <SiteImage
        id="hero-office"
        sizes="(max-width: 768px) 100vw, 360px"
        caption="Office at 7272 S El Capitan Way, Las Vegas, NV 89148"
        className="mb-4"
      />
      <TitleTag
        id={headingId}
        className="font-display text-xl font-semibold text-emerald-950"
      >
        Office and contact
      </TitleTag>
      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="font-medium text-stone-800">Name</dt>
          <dd>
            {siteContact.businessName} — {siteContact.legalBrokerage}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Address</dt>
          <dd>
            {siteContact.address.streetAddress}, {siteContact.address.addressLocality},{" "}
            {siteContact.address.addressRegion} {siteContact.address.postalCode}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Phone</dt>
          <dd>
            <a
              className="font-semibold text-emerald-900 hover:underline"
              href={siteContact.phoneTelHref}
            >
              {siteContact.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Text (SMS)</dt>
          <dd>
            <a
              className="font-semibold text-emerald-900 hover:underline"
              href={siteContact.phoneSmsHref}
            >
              Text {siteContact.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Hours</dt>
          <dd>{siteContact.hoursSummaryLine}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Service area</dt>
          <dd>{siteContact.serviceAreaDescription}</dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Google Maps and reviews</dt>
          <dd className="space-y-2">
            {siteContact.gbpHighlightAttributesLine ? (
              <span className="block text-stone-700">{siteContact.gbpHighlightAttributesLine}</span>
            ) : null}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-4">
              <a
                className="font-medium text-emerald-900 hover:underline"
                href={googleMapsProfileHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions on Google
              </a>
              <a
                className="font-medium text-emerald-900 hover:underline"
                href={googleBusinessProfileReviewHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Google reviews
              </a>
            </div>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Google Search</dt>
          <dd>
            <a
              className="font-medium text-emerald-900 hover:underline"
              href={googleSearchShareHref()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open “Rhodes Ranch Las Vegas” on Google
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">Email</dt>
          <dd className="space-y-1">
            <a className="text-emerald-900 hover:underline" href={`mailto:${siteContact.email}`}>
              {siteContact.email}
            </a>
            <span className="block text-stone-600">
              {siteContact.agentName} — {siteContact.agentTitle}
            </span>
            <a
              className="block text-emerald-900 hover:underline"
              href={`mailto:${siteContact.secondaryEmail}`}
            >
              {siteContact.secondaryEmail}
            </a>
            <span className="text-stone-600">
              {siteContact.secondaryContactName} — {siteContact.secondaryContactTitle}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-stone-800">License</dt>
          <dd>{siteContact.license}</dd>
        </div>
      </dl>
    </section>
  );
}
