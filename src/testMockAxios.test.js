// jest.mock('axios');

// import axios from 'axios';
import testMockAxios from "./testMockAxios";

describe('ToDoList component', () => {
    it('修改流程测试',async ()=>{
        const data = await testMockAxios('/mock/get');
        expect(data).toBe('mock api');
    })
});
