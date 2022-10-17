import { NextPage } from "next";
import { useReduxSelector } from "../../redux/hooks";
import { useRouter } from "next/router";
import { Layout } from "antd";
import styles from "../../styles/viewPage.module.css";
import ViewPageHeader from "../../components/viewPageHeader";
import ViewTags from "../../components/viewTags";
import TimeAndServing from "../../components/timeAndServing";
import ViewIngredients from "../../components/viewIngredients";
import ViewMethods from "../../components/viewMethods";
import BackStory from "../../components/backStory";
import React from "react";

const { Header, Content, Footer } = Layout;

const RecipeDetail: NextPage = () => {
    const router = useRouter();
    const { recipeId } = router.query;
    const recipeList = useReduxSelector((s) => s.recipe.recipeList);
    let recipe: IRecipeListRes | null = null;
    if (recipeList) {
        for (const r of recipeList) {
            r._id === recipeId ? recipe = r : null;
        }
    }
    if (recipe) {
        return (
            <Layout>
                <Header className={styles["header"]}>
                    <ViewPageHeader title={recipe.title} />
                </Header>
                <Content className={styles.content}>
                    <ViewTags tagIds={recipe.tags} />
                    <div className={styles["timeAndServing"]}>
                        <TimeAndServing time={-2} servings={-2}/>
                    </div>
                    <ViewIngredients ingredients={recipe.ingredients}/>
                    <ViewMethods methods={recipe.methods}/>
                    <div className={styles["backStory"]}>
                        <BackStory backStory={"null"}/>
                    </div>
                </Content>
                <Footer className={styles.footer}></Footer>
            </Layout>
        );
    } else {
        return <>null</>
    }
};

export default RecipeDetail;