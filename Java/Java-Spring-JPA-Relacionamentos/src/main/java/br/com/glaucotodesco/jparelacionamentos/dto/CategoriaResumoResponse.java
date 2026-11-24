package br.com.glaucotodesco.jparelacionamentos.dto;

import br.com.glaucotodesco.jparelacionamentos.model.Categoria;

public record CategoriaResumoResponse(
        Long id,
        String nome
) {
    public static CategoriaResumoResponse from(Categoria categoria) {
        return new CategoriaResumoResponse(categoria.getId(), categoria.getNome());
    }
}
