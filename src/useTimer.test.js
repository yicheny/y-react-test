import { renderHook} from '@testing-library/react-hooks/server'
import useTimer from './useTimer'

test('should start the timer', async () => {
    const { result, waitForValueToChange,hydrate  } = renderHook(() => useTimer(0))
    hydrate()
    await waitForValueToChange(() => result.current.count) // times out as the value never changes
    expect(result.current.count).toBe(1) // fails as result.current.count is still 0
})
