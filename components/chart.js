import {Bar} from 'react-chartjs-2';

export default class RateChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Bar
      data={this.props.data}

      />
    )
  }
}