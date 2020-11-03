import ReactToPrint from "react-to-print";
import { PictureAsPdf } from "@material-ui/icons";

const { Button } = require("@material-ui/core");

const DownloadAction = ({ componentRef }) => {
  return (
    <React.Fragment>
      <ReactToPrint
        trigger={() => (
          <Button color="primary" variant="outlined" size="small">
            <PictureAsPdf /> Download
          </Button>
        )}
        content={() => componentRef.current}
        pageStyle="
    @media all {
      .page-break {
        display: none;
      }
    }
    
    @media print {
      html, body {
        height: initial !important;
        overflow: initial !important;
        -webkit-print-color-adjust: exact;
      }
    }
    
    @media print {
      .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: auto;
      }
    }

    @media print {
      .print-container {
          min-height: 100vh;
      }
    
    @page {
      size: auto;
      margin: 0mm;
    }
    "
      />
    </React.Fragment>
  );
};

export default DownloadAction;
