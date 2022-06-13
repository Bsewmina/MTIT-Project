import express, { Request, Response } from 'express';
import { Users } from '../models/bussiness';
//import {  currentUser, requireAuth } from '@infiniteam/common';

const router = express.Router();

// download all customer data  as csv
// router.get('/exportdata', (req, res) => {
//   var wb = XLSX.utils.book_new(); //new workbook
//   Users.find((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       var temp = JSON.stringify(data);
//       temp = JSON.parse(temp);
//       var ws = XLSX.utils.json_to_sheet(temp);
//       var down = './data/Business.xlsx';
//       XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
//       XLSX.writeFile(wb, down);
//       res.download(down);
//     }
//   });
// });

// router.get('/', (req: Request, res: Response) => {
//   res.send({
//     message: 'Hello World',
//   });
// });

// //TODO add bussiness
// // Add a bussiness
// router.post('/', currentUser, requireAuth, (req: Request, res: Response) => {
//   if (req.headers?.token) {
//     res.send({
//       message: `Header available ${req.headers?.token}`,
//     });
//   } else {
//     res.send({
//       message: 'token header not available',
//     });
//   }
// });
//TODO list all bussiness
//TODO get a bussiness
//TODO update a bussiness
//TODO delete a bussiness -> Status = false

export { router as businessRouter };
