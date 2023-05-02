// unit test for hello api
import { expect } from 'chai';
import { describe, it } from 'mocha';

import {GET} from "../../app/api/hello/route"



GET({} as Request).then((response) => {
    describe('GET /api/hello', () => {
        it('should return 200', () => {
        expect(response.status).to.equal(200);
        });
    });
    }

)
