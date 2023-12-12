import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";

import { RegionSearchDto } from "../dto/regioinSearch.dto";

export const regionSearchValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query) {
      return res.status(400).send({ message: "Missing request data!" });
    }
    const product: any = new RegionSearchDto();

    Object.keys(req.query).forEach((v: string) => {
      product[v] = req.query[v];
    });

    await validateOrReject(product);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ data: [], message });
  }
};
