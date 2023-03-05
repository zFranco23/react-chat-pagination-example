import { MOCK_DATA_MESSAGES } from "../constants"


export const getMessages = async (page: number, size: number = 10 ) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(MOCK_DATA_MESSAGES.slice(page, page + size));
        }, 3000);
      });
}