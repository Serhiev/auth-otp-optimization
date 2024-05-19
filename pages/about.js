import Head from "next/head";
import GradientWrapper from "../components/GradientWrapper";
import Features from "../components/ui/Features";
import ToolKit from "../components/ui/ToolKit";

export default function About() {
  return (
    <>
      <Head />
      <GradientWrapper>
        <Features />
        <ToolKit />
      </GradientWrapper>
    </>
  );
}
