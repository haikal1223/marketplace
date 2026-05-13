import { cache } from "react";
import { getLayoutPayload } from "lib/get-layout-payload";
import type LayoutModel from "models/Layout.model";

const getLayoutData = cache(async (): Promise<LayoutModel> => {
  return getLayoutPayload();
});

export default { getLayoutData };
