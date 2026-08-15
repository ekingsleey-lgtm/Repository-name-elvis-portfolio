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
  return (
    <Container className="py-12 lg:py-28">
      <Label>Selected work</Label>
      <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">Case studies</h1>

      <div className="mt-10 lg:mt-16">
        <WorkIndex studies={caseStudies} cols={3} />
      </div>
    </Container>
  );
}
