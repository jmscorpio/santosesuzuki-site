import { escritorio, pendente } from "@/config/escritorio";

type Json = Record<string, unknown>;

/** Remove chaves vazias para não publicar placeholder em dado estruturado. */
function limpar(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );
}

function valorOuUndefined(v: string): string | undefined {
  return pendente(v) ? undefined : v;
}

export function jsonLdEscritorio(): Json {
  const { endereco } = escritorio;
  return limpar({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${escritorio.url}/#escritorio`,
    name: escritorio.nomeCompleto,
    url: escritorio.url,
    telephone: escritorio.telefone,
    email: escritorio.email,
    image: `${escritorio.url}/logo/icone-512.png`,
    logo: `${escritorio.url}/logo/icone-512.png`,
    areaServed: "BR",
    address: limpar({
      "@type": "PostalAddress",
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: valorOuUndefined(endereco.cep),
      addressCountry: endereco.pais,
    }),
    vatID: valorOuUndefined(escritorio.cnpj),
  });
}

export function jsonLdBreadcrumb(
  itens: { nome: string; href: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nome,
      item: `${escritorio.url}${item.href}`,
    })),
  };
}

export function jsonLdArtigo(a: {
  titulo: string;
  descricao: string;
  data: string;
  slug: string;
  autor: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.descricao,
    datePublished: a.data,
    dateModified: a.data,
    author: { "@type": "Organization", name: a.autor },
    publisher: {
      "@type": "Organization",
      name: escritorio.nomeCompleto,
      logo: {
        "@type": "ImageObject",
        url: `${escritorio.url}/logo/icone-512.png`,
      },
    },
    mainEntityOfPage: `${escritorio.url}/insights/${a.slug}`,
  };
}
