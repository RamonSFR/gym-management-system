import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'

export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Invalid Data',
          errors: error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message
          }))
        })
      }
      next(error)
    }
  }
}

export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params)
      ;(req as any).params = validatedParams
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Invalid parameters',
          errors: error.issues.map((err: any) => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        })
      }
      next(error)
    }
  }
}

export const validateQuery = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query)
      ;(req as any).query = validatedQuery
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Invalid query parameters',
          errors: error.issues.map((err: any) => ({
            campo: err.path.join('.'),
            mensagem: err.message
          }))
        })
      }
      next(error)
    }
  }
}
