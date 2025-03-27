import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';

export const todoSchemaLiteral = {
  version: 1,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    task: {
      type: 'string',
    },
    checked: {
      type: 'boolean',
    },
  },
  required: ['id', 'task'],
  indexes: ['id'],
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schemaTyped = toTypedRxJsonSchema(todoSchemaLiteral);

// aggregate the document type from the schema
export type Todo = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

// create the typed RxJsonSchema from the literal typed object.
export const todoSchema: RxJsonSchema<Todo> = todoSchemaLiteral;
