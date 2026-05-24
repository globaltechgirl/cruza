import { Box } from "@mantine/core";
import Overviewer from "@/component/overview/overview";

function Overview () {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Overviewer/>
    </Box>
  );
}

export default Overview;