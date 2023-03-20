import styles from "./Quote.module.css";

type QuoteProps = {
  quote: string;
};

const Quote = ({ quote }: QuoteProps) => {
  return (
    <div className={styles.container}>
      <p>{quote}</p>
    </div>
  );
};

export default Quote;
