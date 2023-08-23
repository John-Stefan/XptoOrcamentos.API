﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using XptoOrcamentos.API.Data;

namespace XptoOrcamentos.API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230822141120_InitialCreation")]
    partial class InitialCreation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("XptoOrcamentos.API.Models.Cliente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CNPJ")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("XptoOrcamentos.API.Models.OrdemServico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ClienteId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataExecucao")
                        .HasColumnType("TEXT");

                    b.Property<int>("PrestadorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TituloServico")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("ValorServico")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ClienteId");

                    b.HasIndex("PrestadorId");

                    b.ToTable("OrdemServicos");
                });

            modelBuilder.Entity("XptoOrcamentos.API.Models.Prestador", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CPF")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Prestadores");
                });

            modelBuilder.Entity("XptoOrcamentos.API.Models.OrdemServico", b =>
                {
                    b.HasOne("XptoOrcamentos.API.Models.Cliente", "Cliente")
                        .WithMany()
                        .HasForeignKey("ClienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("XptoOrcamentos.API.Models.Prestador", "Prestador")
                        .WithMany()
                        .HasForeignKey("PrestadorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cliente");

                    b.Navigation("Prestador");
                });
#pragma warning restore 612, 618
        }
    }
}
