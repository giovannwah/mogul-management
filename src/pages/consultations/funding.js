import React, { useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import { Document, Page, pdfjs } from 'react-pdf';
import Layout from '../../layouts/index';
import SEO from '../../components/SEO';
import JSONFundingPageContent from '../../../content/pages/consultations/funding.json';
import pdfFile from '../../../static/assets/TRIFOLD_MM.pdf';

// specify source of pdf_worker.js to ensure it is added to the
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MAX_PAGES = 2;
const NEXT_STYLE = 'funding-pdf-next-button';
const PREV_STYLE = 'funding-pdf-prev-button';

const Funding = props => {
  const [page, setPage] = useState(0);
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
        <h3 className="funding-list-title">List of Products Offered to Our Clients</h3>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="funding-list page-paragraph" id="funding-list-2">
                {
                  JSONFundingPageContent.content.list_2.map((item) => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div id="funding-pdf">
            <Document
              // file="https://buildmedia.readthedocs.org/media/pdf/flask/stable/flask.pdf"
              file={pdfFile}
            >
              <Page key="page" pageIndex={page}/>
            </Document>
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
      </div>
    </Layout>
  );
};

export default Funding;
