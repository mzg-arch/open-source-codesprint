import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty } from '@codesprint/database';

class ProblemExampleDto {
  @IsString()
  input!: string;

  @IsString()
  output!: string;

  @IsOptional()
  @IsString()
  explanation?: string;
}

class StarterCodeDto {
  @IsString()
  language!: string;

  @IsString()
  code!: string;
}

class TestCaseDto {
  @IsString()
  input!: string;

  @IsString()
  expectedOutput!: string;

  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;
}

export class CreateProblemDto {
  @IsString()
  title!: string;

  @IsString()
  slug!: string;

  @IsString()
  description!: string;

  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @IsOptional()
  @IsString()
  constraints?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimit?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  memoryLimit?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProblemExampleDto)
  examples!: ProblemExampleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StarterCodeDto)
  starterCode!: StarterCodeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  testCases!: TestCaseDto[];
}
