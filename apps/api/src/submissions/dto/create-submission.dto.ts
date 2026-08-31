import { IsString, MinLength } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  problemSlug!: string;

  @IsString()
  language!: string;

  @IsString()
  @MinLength(1)
  sourceCode!: string;
}