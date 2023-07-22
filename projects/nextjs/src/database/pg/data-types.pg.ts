import { sql } from 'drizzle-orm'
import * as drizzle from 'drizzle-orm/pg-core'

type Precision = 0 | 1 | 2 | 3 | 4 | 5 | 6

const { customType, ...type } = drizzle

export interface TypeConfig {
  check?: string
  unique?: boolean
}
const buildSql = (type: string, config: TypeConfig) => {
  const unique = typeof config?.unique !== 'undefined' ? 'UNIQUE' : ''
  const check =
    typeof config?.check !== 'undefined' ? `CHECK (${config?.check})` : ''

  return `${type} ${unique} ${check}`
}

export const serial = type.serial
export const bigserial = type.bigserial
export const smallserial = type.smallserial
export const real = type.real
export const double = type.doublePrecision
export const json = type.json
export const jsonb = type.jsonb
export const uuid = type.uuid

export interface IntegerConfig extends TypeConfig {}
export const integer = customType<{
  data: number
  notNull: true
  default: true
  config: IntegerConfig
}>({
  dataType(config) {
    return buildSql('integer', config as TypeConfig)
  },
})
export const integerArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: IntegerConfig
}>({
  dataType(config) {
    return buildSql('integer []', config as TypeConfig)
  },
})

export interface SmallintConfig extends TypeConfig {}
export const smallint = customType<{
  data: number
  notNull: true
  default: true
  config: SmallintConfig
}>({
  dataType(config) {
    return buildSql('smallint', config as TypeConfig)
  },
})
export const smallintArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: SmallintConfig
}>({
  dataType(config) {
    return buildSql('smallint []', config as TypeConfig)
  },
})

export interface BigintConfig extends TypeConfig {}
export const bigInt = customType<{
  data: number
  notNull: true
  default: true
  config: BigintConfig
}>({
  dataType(config) {
    return buildSql('bigint', config as TypeConfig)
  },
})
export const bigintArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: BigintConfig
}>({
  dataType(config) {
    return buildSql('bigint, []', config as TypeConfig)
  },
})

export interface BooleanConfig extends TypeConfig {}
export const boolean = customType<{
  data: number
  notNull: true
  default: true
  config: BooleanConfig
}>({
  dataType(config) {
    return buildSql('boolean', config as TypeConfig)
  },
})
export const booleanArray = customType<{
  data: boolean[]
  notNull: true
  default: true
  config: BooleanConfig
}>({
  dataType(config) {
    return buildSql('boolean []', config as TypeConfig)
  },
})

export interface NumericConfig extends TypeConfig {
  precision?: number
  scale?: number
}
export const numeric = customType<{
  data: number
  notNull: true
  default: true
  config: NumericConfig
}>({
  dataType(config) {
    const precision =
      typeof config?.precision !== 'undefined' ? config?.precision : ''
    const scale =
      typeof config?.scale !== 'undefined' ? `, ${config?.scale}` : ''
    const arg = precision ? `(${precision}${scale})` : ''

    return buildSql(`numeric ${arg}`, config as TypeConfig)
  },
})
export const numericArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: NumericConfig
}>({
  dataType(config) {
    const precision =
      typeof config?.precision !== 'undefined' ? config?.precision : ''
    const scale =
      typeof config?.scale !== 'undefined' ? `, ${config?.scale}` : ''
    const arg = precision ? `(${precision}${scale})` : ''

    return buildSql(`numeric${arg} []`, config as TypeConfig)
  },
})

export interface DecimalConfig extends TypeConfig {}
export const decimal = customType<{
  data: number
  notNull: true
  default: true
  config: DecimalConfig
}>({
  dataType(config) {
    return buildSql('decimal', config as TypeConfig)
  },
})
export const decimalArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: DecimalConfig
}>({
  dataType(config) {
    return buildSql('decimal []', config as TypeConfig)
  },
})

export interface MoneyConfig extends TypeConfig {}
export const money = customType<{
  data: number
  notNull: true
  default: true
  config: MoneyConfig
}>({
  dataType(config) {
    return buildSql('money', config as TypeConfig)
  },
})
export const moneyArray = customType<{
  data: number[]
  notNull: true
  default: true
  config: MoneyConfig
}>({
  dataType(config) {
    return buildSql('money [] ', config as TypeConfig)
  },
})

export interface charConfig extends TypeConfig {
  length?: number
}
export const char = customType<{
  data: string
  notNull: true
  default: true
  config: charConfig
}>({
  dataType(config) {
    const length =
      typeof config?.length !== 'undefined' ? `(${config.length})` : ''

    return buildSql(`char${length}`, config as TypeConfig)
  },
})
export const charArray = customType<{
  data: string[]
  notNull: true
  default: true
  config: charConfig
}>({
  dataType(config) {
    const length =
      typeof config?.length !== 'undefined' ? `(${config.length})` : ''

    return buildSql(`char${length}`, config as TypeConfig)
  },
})

interface VarcharConfig extends TypeConfig {
  length?: number
}
export const varchar = customType<{
  data: string
  notNull: true
  default: true
  config: VarcharConfig
}>({
  dataType(config) {
    const length =
      typeof config?.length !== 'undefined' ? ` (${config.length})` : ''
    return buildSql(`varchar${length} `, config as TypeConfig)
  },
})
export const varcharArray = customType<{
  data: string[]
  notNull: true
  default: true
  config: VarcharConfig
}>({
  dataType(config) {
    const length =
      typeof config?.length !== 'undefined' ? ` (${config.length})` : ''
    return buildSql(`varchar${length} []`, config as TypeConfig)
  },
})

export interface TextConfig extends TypeConfig {}
export const text = customType<{
  data: string
  notNull: true
  default: true
  config: TextConfig
}>({
  dataType(config) {
    return buildSql('text', config as TypeConfig)
  },
})
export const textArray = customType<{
  data: string[]
  notNull: true
  default: true
  config: TextConfig
}>({
  dataType(config) {
    return buildSql('text []', config as TypeConfig)
  },
})

export interface TimeConfig extends TypeConfig {
  precision?: Precision
}
export const time = customType<{
  data: string
  notNull: true
  default: true
  config: TimeConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`time${precision}`, config as TypeConfig)
  },
})
export const timeArray = customType<{
  data: string
  notNull: true
  default: true
  config: TimeConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`time${precision}`, config as TypeConfig)
  },
})

interface DateConfig extends TypeConfig {
  precision?: Precision
}
export const date = customType<{
  data: Date
  driverData: string
  notNull: true
  default: true
  config: DateConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`date${precision}`, config as TypeConfig)
  },
  fromDriver(value): Date {
    return new Date(value)
  },
})
export const dateArray = customType<{
  data: Date[]
  driverData: string[]
  notNull: true
  default: true
  config: DateConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`date${precision} []`, config as TypeConfig)
  },
  fromDriver(values): Date[] {
    return values.map((value) => new Date(value))
  },
})

interface TimestampConfig extends TypeConfig {
  precision?: Precision
}
export const timestamp = customType<{
  data: Date
  driverData: string
  notNull: true
  default: true
  config: TimestampConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`timestamp${precision}`, config as TypeConfig)
  },
  fromDriver(value): Date {
    return new Date(value)
  },
})
export const timestampArray = customType<{
  data: Date[]
  driverData: string[]
  notNull: true
  default: true
  config: TimestampConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`timestamp${precision} []`, config as TypeConfig)
  },
  fromDriver(values): Date[] {
    return values.map((value) => new Date(value))
  },
})

interface IntervalConfig extends TypeConfig {
  precision?: Precision
}
export const interval = customType<{
  data: string
  notNull: true
  default: true
  config: IntervalConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`interval${precision}`, config as TypeConfig)
  },
})
export const intervalArray = customType<{
  data: Date
  notNull: true
  default: true
  config: IntervalConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(`interval$${precision} []`, config as TypeConfig)
  },
})

interface TimestampzConfig extends TypeConfig {
  precision?: Precision
}
export const timestampz = customType<{
  data: Date
  driverData: string
  notNull: true
  default: true
  config: TimestampzConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(
      `timestamp${precision} with time zone`,
      config as TypeConfig
    )
  },
  toDriver(date: Date): string {
    return date.toISOString()
  },
  fromDriver(value: string): Date {
    return new Date(value + '+0000')
  },
})
export const timestampzArray = customType<{
  data: Date[]
  driverData: string[]
  notNull: true
  default: true
  config: TimestampzConfig
}>({
  dataType(config) {
    const precision = config?.precision ? `(${config.precision})` : ''
    return buildSql(
      `timestamp${precision} with time zone []`,
      config as TypeConfig
    )
  },
  fromDriver(values: string[]): Date[] {
    return values.map((value) => new Date(value))
  },
})

export const createdAt = () => timestampz('created_at').notNull()
export const createdBy = () => type.integer('created_by').notNull()
export const modifiedAt = () => timestampz('modified_at').default(sql`now()`)
export const modifiedBy = () => type.integer('modified_by').notNull()

export const image = () => ({
  image_url: type.text('image_url'),
  image_alt: type.text('image_url'),
  image_width: type.integer('image_width'),
  image_height: type.integer('image_height'),
})

export const imageArray = (name = 'images') =>
  type.json(name).$type<
    {
      ulr: string
      alt: string
      width: number
      height: number
    }[]
  >()

export const link = () => ({
  label: type.varchar('label', { length: 256 }).notNull(),
  url: type.text('url').notNull(),
  icon: type.text('icon'),
})

export const links = (name: string) =>
  type.json(name).$type<
    {
      label: string
      url: string
      icon: string
    }[]
  >()

type Menu = {
  label: string
  url: string
  icon: string
  items?: Menu[] | null
}
export const menuItems = (name: string) => type.json(name).$type<Menu[]>()
