import React from 'react';
import { compose } from 'recompose';

import Table from '../Table';
import Button from '../Button';

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

const Loading = () =>
  <div className="loader loader--style1" title="0">
    <svg id="loader-1" width="40px" height="40px">
      <path opacity="0.2" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"/>
      </path>
    </svg>
  </div>

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
