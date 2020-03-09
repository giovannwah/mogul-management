import React from 'react';

const renderQuote = (quote, quotee, keywords) => {
  const words = quote.split(' ');
  return (
    <div>
      <p>
        <span className="parens">"</span>
        {
          words.map((word, i) => {
            if (keywords.includes(word)) {
              return (<span className="text-highlight">{ `${word}${i === words.length-1 ? '' : ' '}` }</span>);
            }
            else {
              return (<span>{ `${word}${i === words.length-1 ? '' : ' '}` }</span>);
            }
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
    { renderQuote(props.quote, props.quotee, props.keywords) }
  </div>
);

export default Quote;
