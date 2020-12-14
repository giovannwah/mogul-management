import React, { useState } from 'react';
import {
  Button, Table, TableBody, TableRow, TableHead, TableCell, Collapse
} from '@material-ui/core';
import { Document, Page, pdfjs } from 'react-pdf';
import Layout from '../../layouts/index';
import SEO from '../../components/SEO';
import JSONFundingPageContent from '../../../content/pages/consultations/funding.json';
import pdfFile from '../../../static/assets/TRIFOLD_MM.pdf';

// specify source of pdf_worker.js to ensure it is added to the correct output directory at build tie, see
// https://github.com/wojtekmaj/react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MAX_PAGES = 2;

const Funding = props => {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const nextPage = () => {
    if (page < MAX_PAGES) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  return (
    <Layout>
      <SEO title="Funding"/>
      <div>
        <div className="intro intro-small">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>{JSONFundingPageContent.content.title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <p className="page-paragraph">{JSONFundingPageContent.content.paragraph}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="funding-list page-paragraph" id="funding-list-1">
                {
                  JSONFundingPageContent.content.list.map((item) => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Table className="funding-table">
                <TableHead className="funding-table" onClick={() => setOpen(!open)}>
                  <h3 style={{cursor: "pointer", margin: 0}} className="funding-list-title"><a>List of Products Offered to Our Clients</a></h3>
                </TableHead>
                <TableBody className="funding-table">
                  <TableRow className="funding-table">
                    <TableCell className="funding-table">
                      <Collapse in={open} timeout="auto" unmountOnExit className="funding-table">
                        <ul className="funding-list page-paragraph" id="funding-list-2">
                          {
                            JSONFundingPageContent.content.list_2.map((item) => (
                              <li>{item}</li>
                            ))
                          }
                        </ul>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div id="funding-consul-link">
                <h3 className="funding-list-title">
                  <a href="https://share.hsforms.com/1qnitGOUCQMa4mM4cgvF_SQ45jf7" target="_blank">Click here for your free consultation!</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div id="funding-pdf">
          <div id="funding-pdf-container">
            <Document
              file={pdfFile}
              id="funding-doc"
            >
              <Page key="page" pageIndex={page}/>
            </Document>
          </div>
          <div id="funding-pdf-buttons">
            <Button
              id="funding-prev-button"
              className="funding-buttons"
              onClick={prevPage}
              disabled={page === 0}>
              Back
            </Button>
            <div id="funding-page-count">
              Page { page + 1 } of { MAX_PAGES + 1 }
            </div>
            <Button
              id="funding-next-button"
              className="funding-buttons"
              onClick={nextPage}
              disabled={page === MAX_PAGES}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Funding;
