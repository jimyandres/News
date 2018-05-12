import React from 'react';
import { compose } from 'recompose';

import Table from './Table';
import Button from './Button';
import Loading from './Loading';

const withInfiniteScroll = (conditionalFn) => (Component) =>
  class WithInfiniteScroll extends React.Component {

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (conditionalFn(this.props)) {
          this.props.onClick();
        }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

const EnhancedTable = ({error,isError,list,onDismiss}) =>
  <TableWithError
    isError={isError}
    error={error}
    list={list}
    onDismiss={onDismiss}
  />

const withLoading = (conditionalFn) => (Component) =>
  (props) =>
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
      <Component {...props} />
      {conditionalFn(props) &&
      <Loading />}
    </div>

const withPaginated = (conditionalFn) => (Component) =>
  (props) =>
    <div>
      <Component {...props} />

      {conditionalFn(props) &&
        <div className="interactions">
          <Button
            isLoading={props.isLoading}
            onClick={props.onClick}
          >
            {props.buttonText}
          </Button>
        </div>
      }
    </div>

const withError = (Component) =>
  ({isError, ...rest}) =>
    isError
    ? <div className="interactions">
      <p>Something went wrong.</p>
    </div>
    : <Component {...rest} />

const TableWithError = withError(Table);

const paginatedCondition = props => props.isError;

const infiniteScrollCondition = props =>
  ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)
  && props.list.length
  && !props.isLoading
  && !props.isError);

const loadingCondition = props => props.isLoading;

const EnhancedTableWithConditionalRendering = compose(
  withPaginated(paginatedCondition),
  withInfiniteScroll(infiniteScrollCondition),
  withLoading(loadingCondition),
)(EnhancedTable);

export default EnhancedTableWithConditionalRendering;
