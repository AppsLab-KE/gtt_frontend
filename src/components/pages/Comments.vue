<template>
    <div class="single-comment comments_wrap">
        <section id="comments">
            <div class="comments-inner clr">
                <div id="respond" class="comment-respond">
                    <h3 id="reply-title" class="comment-reply-title">Leave a Reply</h3>
                    <form action="single.html#" method="post" id="commentform" class="comment-form" novalidate="">
                    <p class="comment-form-comment">
                        <label for="comment">Comment:</label> 
                        <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required"></textarea>
                    </p>
                    <p class="form-submit">
                        <input name="submit" type="submit" id="submit" class="submit btn btn-success btn-block" value="Post Comment">
                    </p>
                    </form>
                </div>
                <!-- #respond -->
            </div>
        </section>
    </div>
</template>
