import React from "react";

const NegativeSentimentCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-4 hover:bg-red-500 hover:text-white cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <span role="img" aria-label="Negative Emoji" className="text-4xl mb-4">
        😞
      </span>
      <h2 className="text-xl font-semibold">Negative </h2>
      <p className="text-gray-600">
        This video sparkles negative vibes. It's essential to stay positive and
        find reasons to smile.
      </p>
    </div>
  );
};

const NeutralSentimentCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-4 hover-bg-gray-500 hover-text-white cursor-pointer transform transition-transform duration-300 hover--translate-y-1 hover-shadow-2xl">
      <span role="img" aria-label="Neutral Emoji" className="text-4xl mb-4">
        😐
      </span>
      <h2 className="text-xl font-semibold">Neutral </h2>
      <p className="text-gray-600">
        This video sparkles neutral feelings. Life is full of ups and downs, and
        sometimes it's okay to stay neutral.
      </p>
    </div>
  );
};

const PositiveSentimentCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-4 hover-bg-green-500 hover-text-white cursor-pointer transform transition-transform duration-300 hover--translate-y-1 hover-shadow-2xl">
      <span role="img" aria-label="Positive Emoji" className="text-4xl mb-4">
        😊
      </span>
      <h2 className="text-xl font-semibold">Positive </h2>
      <p className="text-gray-600">
        This video sparkles with positivity and good vibes. Keep spreading joy
        and happiness!
      </p>
    </div>
  );
};

export { NegativeSentimentCard, NeutralSentimentCard, PositiveSentimentCard };
