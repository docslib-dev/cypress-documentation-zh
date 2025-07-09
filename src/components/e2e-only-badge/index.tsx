import React from "react";
import Badge from "@site/src/components/badge";

export default function E2EOnlyBadge() {
  return (
    <Badge
      type="hint"
      path="/app/core-concepts/testing-types#What-is-E2E-Testing"
    >
      仅限端到端测试
    </Badge>
  );
}