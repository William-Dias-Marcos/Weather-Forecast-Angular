import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords',
  standalone: true,
})
export class CapitalizeWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value; // Retorna a string original se estiver vazia ou indefinida
    }

    return value
      .split(' ') // Divide a frase em palavras
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Torna a primeira letra maiúscula e o resto minúsculo
      .join(' '); // Junta as palavras novamente em uma frase
  }
}
