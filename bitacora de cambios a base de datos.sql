-- TABLA PARA SOCIEDADES AUXILIARES

-- use `sistemacontabilidad-agsnasoft`;

create table sociedad_auxiliar (
    usuario VARCHAR(16),
    sociedad VARCHAR(4),
    CONSTRAINT PK_sociedad_auxiliar PRIMARY KEY (usuario, sociedad),
    CONSTRAINT FK_sociedad_auxiliar_usuario FOREIGN KEY (usuario) REFERENCES usuario (id),
    CONSTRAINT FK_sociedad_auxiliar_sociedad FOREIGN KEY (sociedad) REFERENCES sociedad (sociedad)
);

-- NO ESTOY SEGURO DE LA LONGITUD
alter table sap_costos add column idioma varchar(6);
alter table sap_cuentasm add column idioma varchar(6);

-- ESTE VA PARA SAP_SOCIEDAD
ALTER TABLE `sap_sociedad` 
    ADD COLUMN `party` VARCHAR(6) NULL DEFAULT AFTER `sociedad`,
    ADD COLUMN `name_adrc` VARCHAR(160) NULL DEFAULT NULL AFTER `butxt`,
    CHANGE COLUMN `denominacion` `butxt` VARCHAR(25) NULL DEFAULT NULL ,
    DROP PRIMARY KEY,
    ADD PRIMARY KEY (`sociedad`, `party`);
;

-- AJUSTE DE LONGITUD PEP 2019-06-11
ALTER TABLE `gasto_de_solicitud_de_contabilizacion_de_caja_chica` 
CHANGE COLUMN `elemento_pep` `elemento_pep` VARCHAR(50) NULL DEFAULT NULL ;