import { MOCK_DATA_MESSAGES } from "../constants"
import { Message } from "../types";


export const getMessages = async (page: number, size: number = 10 ) => {

    return new Promise<Message[]>((resolve,reject) => {
        setTimeout(() => {
          resolve(MOCK_DATA_MESSAGES.reverse().slice(page, page + size));
        }, 2000);
      });
}
