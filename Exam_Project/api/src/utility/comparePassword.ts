// @ts-ignore
import bcrypt from 'bcrypt';

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Failed to compare passwords');
  }
};