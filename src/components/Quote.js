import React from 'react';

const renderQuote = (quote, quotee, keywords, skip) => {
  const words = quote.split(' ');
  const skipped = [];
  return (
    <div>
      <p>
        <span className="parens">"</span>
        {
          words.map((word, i) => {
            console.log(word);
            if ((keywords.includes(word) && !skip.includes(word)) || skipped.includes(word)) {
              return (<span className="text-highlight">{ `${word}${i === words.length-1 ? '' : ' '}` }</span>);
            }
            if (skip.includes(word)) {
              // words that appear in the "skip" list will not be highlighted the first time they appear
              // in the quote. They will be highlighted the second time they appear in the quote.
              // This is a horrible way to do it but hey.
              skipped.push(word);
            }
            return (<span>{ `${word}${i === words.length-1 ? '' : ' '}` }</span>);
          })
        }
        <span className="parens">"</span>
      </p>
      <p id="quotee" className="quote">{ `-${quotee}` }</p>
    </div>
  );
};

const Quote = props => (
  <div className="quote">
    { renderQuote(props.quote, props.quotee, props.keywords, props.skip) }
  </div>
);

export default Quote;
