import { Grid, Column } from '@carbon/react';

// used in LandingPage in home directory
// // Take in a phrase and separate the third word in an array

function createArrayFromPhrase(phrase) {
  const splitPhrase = phrase.split(' ');
  const thirdWord = splitPhrase.pop();
  return [splitPhrase.join(' '), thirdWord];
  // return joined first two words and the third word separately
}

const InfoSection = (props) => (
  <Grid className={`${props.className} info-section`}>
    <Column md={8} lg={16} xlg={3}>
      <h3 className="info-section__heading"> {props.heading} </h3>
    </Column>
    {/* Without props.children, InfoSection will only render the Grid and Column elements, ignoring everything nested within it. */}
    {props.children}
  </Grid>
);

const InfoCard = (props) => {
  const splitHeading = createArrayFromPhrase(props.heading);

  return (
    <Column sm={4} md={8} lg={5} xlg={4} className="info-card">
      <h4 className="info-card__heading">
        {/* joined word 1 and 2: {splitHeading[0]} <br /> */}
        {`${splitHeading[0]} `}
        <strong>{splitHeading[1]} </strong>
      </h4>
      <p className="info-card__body"> {props.body}</p>

      {props.icon()}
    </Column>
  );
};

export { InfoSection, InfoCard };
