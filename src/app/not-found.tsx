import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <Container className="py-24">
      <EmptyState
        title="This page has wandered off outside"
        description="The page you're looking for doesn't exist. Let's get you back to the furniture."
        actionLabel="Back to Shop"
        actionHref="/shop"
      />
    </Container>
  );
}
