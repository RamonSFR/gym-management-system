import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerDefinition } from 'swagger-jsdoc'

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Gym API',
    version: '1.0.0',
    description:
      'A comprehensive API for gym management including employees, members, and workouts',
    contact: {
      name: 'API Support',
      email: 'support@gymapi.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  components: {
    schemas: {
      Employee: {
        type: 'object',
        required: ['name', 'role', 'cpf', 'wage'],
        properties: {
          id: {
            type: 'integer',
            description: 'Auto-generated unique identifier',
            readOnly: true
          },
          name: {
            type: 'string',
            description: 'Employee full name'
          },
          role: {
            type: 'string',
            description: 'Employee role/position'
          },
          cpf: {
            type: 'string',
            description: 'Employee CPF (unique)'
          },
          wage: {
            type: 'number',
            format: 'float',
            description: 'Employee wage'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            readOnly: true
          },
          workouts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Workout'
            }
          }
        }
      },
      Member: {
        type: 'object',
        required: ['name', 'membership', 'cpf'],
        properties: {
          id: {
            type: 'integer',
            description: 'Auto-generated unique identifier',
            readOnly: true
          },
          name: {
            type: 'string',
            description: 'Member full name'
          },
          membership: {
            type: 'string',
            enum: ['silver', 'platinum', 'gold'],
            description: 'Membership tier'
          },
          cpf: {
            type: 'string',
            description: 'Member CPF (unique)'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            readOnly: true
          },
          workouts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Workout'
            }
          }
        }
      },
      Workout: {
        type: 'object',
        required: ['exercises', 'personalId', 'memberId'],
        properties: {
          id: {
            type: 'integer',
            description: 'Auto-generated unique identifier',
            readOnly: true
          },
          exercises: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Exercise'
            },
            description: 'Array of exercises in the workout'
          },
          personalId: {
            type: 'integer',
            description: 'ID of the personal trainer (Employee)'
          },
          memberId: {
            type: 'integer',
            description: 'ID of the member'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
            readOnly: true
          },
          personal: {
            $ref: '#/components/schemas/Employee'
          },
          member: {
            $ref: '#/components/schemas/Member'
          }
        }
      },
      Exercise: {
        type: 'object',
        required: ['name', 'reps', 'interval'],
        properties: {
          name: {
            type: 'string',
            description: 'Exercise name',
            example: 'Push-ups'
          },
          reps: {
            type: 'integer',
            minimum: 1,
            description: 'Number of repetitions',
            example: 15
          },
          interval: {
            type: 'integer',
            minimum: 1,
            description: 'Rest interval in seconds',
            example: 30
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message'
          }
        }
      }
    },
    responses: {
      BadRequest: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      Conflict: {
        description: 'Resource conflict (duplicate data)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    }
  }
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
