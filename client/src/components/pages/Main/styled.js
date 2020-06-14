import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { getStyledProps, getSpacing } from '../../../styles';

const AppGrid = styled(Grid)`
  &&
  {
    background-color: ${getStyledProps('theme.palette.grey.300')};

  ${(props) => {
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const mdDown = breakpoints.down('md');

    return `
      ${mdDown} {
        flex-flow: column;
      }
    `;
  }}
  }
`;

const AppContainer = styled(Paper)`
  && {
    flex: 1 auto;
    display: flex;
    overflow: hidden;

  ${(props) => {
    const maxWidth = getStyledProps('theme.breakpoints.values.lg')(props);
    const breakpoints = getStyledProps('theme.breakpoints')(props);
    const lgUp = breakpoints.up('lg');
    const mdDown = breakpoints.down('md');

    return `
      ${lgUp} {
        max-width: ${maxWidth}px;
        margin: ${getSpacing(4)(props)} 0;
      }
      ${mdDown} {
        border-radius: 0;
      }
    `;
  }};
  }
`;

export {
  AppGrid,
  AppContainer,
};
