import type { Metadata } from "next";
import { Container, Label } from "@/components/primitives";
import { WorkIndex } from "@/components/work-index";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: site.metaDescription,
};

export default function WorkPage() {
  const featured = caseStudies.slice(0, 3);
  const earlier = caseStudies.slice(3);

  return (
    <Container className="py-20 lg:py-28">
      <Label>Selected work</Label>
      <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">Case studies</h1>

      <div className="mt-16">
        <WorkIndex studies={featured} cols={3} />
      </div>

      {earlier.length > 0 && (
        <>
          <div className="mt-16 flex items-center gap-6">
            <Label muted>Earlier work</Label>
            <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          </div>
          <div className="mt-10 max-w-sm">
            <WorkIndex studies={earlier} />
          </div>
        </>
      )}
    </Container>
  );
}
