# Git tips

This article contains a list of tips to make `git` becomes your
best day to day tool from the ugly monster beast that you pictured
it until now.

We will use the following conventions along the article:
- `main-repo` refer to the repository out of your control.
  The one you want to submit pull requests to.
- `fork-repo` refer to the repository you have created using
  the **Fork** button within the github interface.
- `local-repo` refer to the repository on your local machine
  that you have created using `git clone` on `fork-repo` or
  `main-repo`.

## Working on github

Contributing to a repository on github which is out of your
control will require from you to work with at least two remote
on your local repository. Once you'll see how it works, you
will realize that it is not much different than working with
a single remote as you might typically found in an enterprise
environment.

## Getting started

You want to submit a contribution to `awesome-repo` own by `jdoe`.
First thing, you need to create your `fork`:

![click fork](https://help.github.com/assets/images/help/repository/fork_button.jpg)

After having fork a repository, you have two options:

```bash
# Option 1: clone the original repository
git clone git@github.com:jdoe/awesome-repo.git
# Option 2: clone your fork
git clone git@github.com:<you>/awesome-repo.git
```

Whether option you chose, will only change the default.
When you clone, git will do two things for you, among other things:

1. Create a local remote named `origin` that tracks the repository you just cloned.
2. Create a local branch `master` with its upstream branch set to `origin/master`.

None of these defaults are irreversible. To make things simpler we will
entirely ignore those defaults.

> Note: You are free to work with them if you prefer.
>       Once you have understood enough on git branches
>       you will be comfortable enough to do whatever you like.

We are going to create a branch that we will **never** commit to.
We are just going to use it to track the `jdoe/master` branch.

#### Important notes:

This is not strictly necessary. You could use the `jdoe/master` as a starting
point instead whenever you create a new branch.


So let's set a branch that will track the remote `jdoe/master`.
First add the original repository as a local remote:

```bash
git remote add main git@github.com:jdoe/awesome-repo.git
git fetch main
```

Then create the branch set to the commit starting at where `jdoe/master`
points to in our local repository:

```bash
git checkout main/master
git checkout -b main-master
git branch --set-upstream-to=main/master
```

Finally, we will add our own fork, but we won't do anything else
than adding the fork name to our local repository:

```bash
git remote add fork git@github.com:<you>/awesome-repo.git
git fetch fork
```

## <a name="loop"></a> The work-flow loop

This is it! We are now ready to follow our day to day loop of submitting
patches. Let's see how that would typically work:

We create a branch before doing anything:

```bash
git checkout main-master
git pull
git checkout -b abranch
```

Business as usual, we do a few commits:

```bash
git add ...
git commit ...
...
```

After a while we want to submit the pull request.
But in order to do so, github needs to know about `abranch`.
That's where we use our `fork`. So far the picture looks like this:

```js
                              abranch
                                 |
                                 |
                                 *
                                 |
                            +----+
      master            main-master
        |                   |
        |                   |
        *                   *
        |                   |
        *                   *
        |                   |
  +-----+-------+      +----+---------+
  |             |      |              |
  |  main-repo  |      |  local-repo  |
  |             |      |              |
  +-------------+      +--------------+
```

Let's push our branch to our fork:

```bash
git push --set-upstream fork abranch
```

This is now the new picture:


```js
                              abranch           abranch
                                 |                 |
                                 |                 |
                                 *                 *
                                 |                 |
                            +----+                 |
      master            main-master                *
        |                   |                      |
        |                   |                      |
        *                   *                      *
        |                   |                      |
        *                   *                      *
        |                   |                      |
  +-----+-------+      +----+---------+      +-----+-------+
  |             |      |              |      |             |
  |  main-repo  |      |  local-repo  |      |  fork-repo  |
  |             |      |              |      |             |
  +-------------+      +--------------+      +-------------+
```

We can now go on https://github.com/jdoe/awesome-repo and submit
our changes by creating a pull request:

![create pull request](https://help.github.com/assets/images/help/repository/repo-actions-pullrequest.png)

## The pull request can't be merged!

Oh no! Many contributions were merged before ours could be. Some of
those contributions have changed similar part of the code base that
we also modified. We have conflicts!

Don't panic.

This scenario is pretty common. Particularly on popular repositories
that have many contributors, with many of them very active.
Git will help you to understand what went wrong and help you
solve the conflicts. First update your local refs:

```bash
git fetch main
```

We will now *rebase* our changes on top of the latest `main/master`.
This is the best approach because git will iteratively re-apply your
changes one after the other and lead you to a clean branch up to date.

Rebase are also sometimes mandatory because they helps having a cleaner
git history. So you the owner of the repository might ask you to do one.

> Note: They might also ask you to `squash` your commits into a single one.
>       We will talk about it later.

So the picture of the repositories should look something like this:

```js
      master
        |
        |                     abranch <- 2      abranch
        *                        |                 |
        |                        |                 |
        |                        *    <- 1         *
        *                        |                 |
        |                   +----+                 |
        *              main-master                 *
        |                   |                      |
        |                   |                      |
        *                   *                      *
        |                   |                      |
        *                   *                      *
        |                   |                      |
  +-----+-------+      +----+---------+      +-----+-------+
  |             |      |              |      |             |
  |  main-repo  |      |  local-repo  |      |  fork-repo  |
  |             |      |              |      |             |
  +-------------+      +--------------+      +-------------+
```

The rebase will move our parent to `main/master`, apply the change of
commit 1. If no conflicts are found, then it will apply the ones of
commit 2 and so on.

Let's get started:

```bash
git rebase main/master
```

If everything went well, you are done and can do a `git push`.
Typically you will get something like:

```bash
First, rewinding head to replay your work on top of it...
Applying: commit 1
Using index info to reconstruct a base tree...
M	some-file
Falling back to patching base and 3-way merge...
Auto-merging some-file
CONFLICT (content): Merge conflict in some-file
error: Failed to merge in the changes.
Patch failed at 0001 commit 1.
The copy of the patch that failed is found in: .git/rebase-apply/patch

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
```

Basically, git tells you everything what it did and what you can do.
If you want more info, you can do `git status`, you will get something like:

```bash
You are currently rebasing branch 'abranch' on 'cb0d2df'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)

Unmerged paths:
  (use "git reset HEAD <file>..." to unstage)
  (use "git add <file>..." to mark resolution)

	both modified:   some-file

no changes added to commit (use "git add" and/or "git commit -a")
```

You can do `git mergetool` to solve the conflicts or use whatever
tool you'd like.

Once you are done:

```bash
git rebase --continue
```

## Pull request merged!

:tada: :tada: :tada: :tada:

Bravo! Your pull request was merged!

It's now time, to do some cleanup:

```bash
git checkout main-master
git branch -D abranch
```

And [then you can start again...](#loop)

## <a name="oops"></a> Oops! I kept working on the old branch

No worries! We are all human and we *do* make mistakes.
Git is the stupid content tracker and he does not know
anything about your work-flow. It does exactly what you
tells him to do even if it's not what you intended to do.

So our branch was merged on the main repository. However,
we have added new commits to `abranch` instead of following
restarting afresh from `main-master`.

If one of github buttons was used, it can lead to different
problems.

![buttons](https://help.github.com/assets/images/help/pull_requests/select-rebase-and-merge-from-drop-down-menu.png)

However, whatever problems any of these button caused, they can all
be solved using `git cherry-pick`.
With this command you can port any commits you have done on `abranch`
to a new clean branch starting from `main/master`.

## Reset a broken branch.

If at any point, you have done something wrong and you need
to reset the branch, for tracked branches you always have
the following options.

### Option 1: `git reset`

```bash
# Set the current branch to point at the same commit
# as <remote>/<branch-name>
git reset --hard <remote>/<branch-name>
```

### Option 2: `git reflog`

This option is great because you can use it in *any*
situation. It list you the previous commit at which
the `HEAD` was pointing to. This way, even if you turns
out with a totally broken history or commits. You can
always revert and go back to a state that was clean.
