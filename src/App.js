import * as Sentry from "@sentry/react";
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";

const SENTRY_TAG_ERROR_BOUNDARY = "ErrorBoundaryTag";

// Init Sentry
Sentry.init({
  dsn: "https://9be53c4528554ac3a5b400ad29c5f7bc@o132438.ingest.sentry.io/5398535",
  enabled: true,
  environment: "development",
  beforeSend(event) {
    console.log("beforeSend", event);
    return event;
  },

  integrations: [
    new CaptureConsoleIntegration({
      levels: ["warn", "error"],
    }),
  ],
});

function App() {
  return (
    <ErrorBoundary>
      <FailingComponent />
      <div>App content</div>
    </ErrorBoundary>
  );
}

export default App;

// Internal component throwing error
const FailingComponent = () => {
  throw new Error("Error from Failing Component using console integration");
};

// Sentry error boundary
export const ErrorBoundary = ({ children }) => (
  <SentryErrorBoundary
    beforeCapture={(scope, hint) => {
      console.log("beforeCapture", scope, hint);
      scope.setTag(SENTRY_TAG_ERROR_BOUNDARY, true);
    }}
    fallback={({ error }) => {
      return <div>Error Page</div>;
    }}
  >
    {children}
  </SentryErrorBoundary>
);
