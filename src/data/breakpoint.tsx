
import { createProviderConsumer } from '@stencil/state-tunnel';
import { ExaHeraldBreakpoint } from '..';

export interface Breakpoint {
  breakpoint: ExaHeraldBreakpoint,
  columns: number
  increment?: () => void
}

export const BreakpointTunnel = createProviderConsumer<Breakpoint>({
    breakpoint: ExaHeraldBreakpoint.mobile,
    columns: 3,
  }, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />
)
