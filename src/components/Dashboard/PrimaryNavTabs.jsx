import * as React from 'react';

import {
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function PrimaryNavTabs() {
  const router = useRouter();
  const [context, setContext] = React.useState('betting');

  const handleContext = (event, newContext) => {
    if (newContext !== null) {
      setContext(newContext);
    }
    if (newContext === "bookie") {
      router.push('/bookie');
    }
    router.push('/')
  };

  return (
    <Stack direction="row" spacing={4}>
      <ToggleButtonGroup
        value={context}
        exclusive
        onChange={handleContext}
        aria-label="betting or bookie site toggle"
      >
        <ToggleButton value="betting" aria-label="betting site">
          Betting
        </ToggleButton>
        <ToggleButton value="bookie" aria-label="bookie site">
          Be the Bookie
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
